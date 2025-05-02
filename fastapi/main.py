from fastapi import FastAPI,File,UploadFile,HTTPException
from pydantic_modules import QueryInput,QueryResponse,DocumentInfo,DeleteFileRequest
from langchain_utils import get_rag_chain
from db_utils import insert_application_logs,get_chat_history,get_all_documents,insert_documents_record,delete_document_record
from chroma_utils import index_document_to_chroma,delete_document_from_chroma
import os
import uuid
import logging
import shutil

#setting up logging file
logging.basicConfig(filename='app.log',level=logging.INFO)

#setting up the server
app=FastAPI()

@app.post("/chat",response_model=QueryResponse)
def chat(queryInput:QueryInput):
    session_id=queryInput.session_id
    logging.info(f"Session ID: {session_id} , UserQuey:{queryInput.query} ,Model;{queryInput.model.value}")
    
    if not session_id:
        session_id=str(uuid.uuid4())

    chat_history=get_chat_history(session_id)
    rag_chain=get_rag_chain(queryInput.model.value)
    answer=rag_chain.invoke({
        "input":queryInput.question,
        "chat_history":chat_history,
    })['answer']

    insert_application_logs(session_id,queryInput.question,answer,queryInput.model.value)
    logging.info(f"Session_id:{session_id},,AI response:{answer}")
    return QueryResponse(answer=answer,session_id=session_id,model=queryInput.model)  


@app.post('./upload-doc')
def upload_and_index_document(file:UploadFile=File(...)):
    allowed_extensions=['.pdf','.docx','.html']
    file_extension=os.path.splitext(file.filename)[1].lower()

    if file_extension not in allowed_extensions:
        raise HTTPException(status_code=400, detail=f"unsupported file type. Allowed types are: {', '.join(allowed_extensions)}")

    temp_file_path=f"temp{file.filename}"

    try:
        #save uploaded file to a temporary file
        with open(temp_file_path,"wb") as buffer:
            shutil.copyfileobj(file.file,buffer)
        
        file_id=insert_documents_record(file.filename)
        success=index_document_to_chroma(temp_file_path,file_id)

        if(success):
            return {"message:" f"File {file.filename} has been successfully uploaded and indexed","file_id:{file_id}"}
        else:
            delete_document_record(file_id)
            raise HTTPException(status_code=500,detail=f"Failed to index{file.filename}.")
    finally:
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)
                    
@app.get("/list-docs",response_model=list[DocumentInfo])
def list_documents():
    return get_all_documents()

@app.post("/delete-doc")
def delete_document(request:DeleteFileRequest):
    #delete from chroma
    chroma_delete_success=delete_document_from_chroma(request.file_id)

    if chroma_delete_success:
        #if successsfully deleted from chroma,delete from our database
        db_delete_success=delete_document_record(request.file_id)
        if db_delete_success:
            return {"message:",f"Successfully deleted file with file id{request.file_id} from the system"}
        else:
            return {"error":f"Deleted from chroma but failed to delete file with file id :{request.file_id}from database"}
    else:
        return {"messgae",f"Failed to delete file with file id{request.file_id} from chroma"}
    



