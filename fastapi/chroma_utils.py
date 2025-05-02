from langchain.embeddings import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain_community.document_loaders import PyPDFLoader, Docx2txtLoader, UnstructuredHTMLLoader

from typing import List
from langchain_core.documents import Document
import os
import logging

text_splitter=RecursiveCharacterTextSplitter(chunk_size=1000,chunk_overlap=200,length_function=len)
embedded_function=OpenAIEmbeddings()
vector_store=Chroma(embedding_function=embedded_function,collection_name="documents",persist_directory="./chroma_db")

def load_and_split_document(file_path:str)-> List[Document]:
    if file_path.endswith('.pdf'):
        loader=PyPDFLoader(file_path)
    elif file_path.endswith('.docx'):   
        loader=Docx2txtLoader(file_path)
    elif file_path.endswith('.html'):
        loader=UnstructuredHTMLLoader(file_path)
    else:   
        raise ValueError("Unsupported file type. Supported types are: .pdf, .docx, .html")
    
    documents=loader.load()
    return text_splitter.split_documents(documents)

def index_document_to_chroma(file_path:str,file_id:int)-> bool:
    try:
        splits=load_and_split_document(file_path)

        #add metadata to each split 
        for split in splits:
            split.metadata["file_id"]=file_id

        vector_store.add_documents(splits)
        vector_store.persist()
        return True
    except Exception as e:
        print(f"Error indexing document: {e}")
        return False
    
def delete_document_from_chroma(file_id:int)-> bool:
    try:
        #delete all documents with the given file_id
        docs=vector_store.get(where={"file_id":file_id})
        print(f"Found {len(docs['ids'])} document chunks with file id {file_id} to delete.")

        vector_store._collection.delete(where={"file_id":file_id})
        print(f"Deleted {len(docs['ids'])} document chunks with file id {file_id}.")
        return True
    except Exception as e:
        print(f"Error deleting document: {e}")
        return False
    