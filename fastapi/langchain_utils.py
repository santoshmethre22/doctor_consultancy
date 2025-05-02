

qa_prompt=ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant that answers questions based on the provided context."),
    ("system", "context:{context}"),
    MessagesPlaceholder(variable_name="chat_history"),
    ("human", "{input}"),
])

def get_rag_chain(model_name="gpt-3.5-turbo"):
    llm=ChatOpenAI(model_name=model_name,temperature=0.0)
    history_aware_retriever=create_history_aware_retriever(llm,retriever,contextualize_q_prompt)
    question_answer_chain=create_document_chain(llm,qa_prompt)
    rag_chain=create_retrievel_chain(history_aware_retriever,question_answer_chain)
    return rag_chain
       
