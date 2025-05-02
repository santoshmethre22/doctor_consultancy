import sqlite3
from datetime import datetime

DB_NAME="rag_app.db"

def get_db_connection():
    conn=sqlite3.connect(DB_NAME)
    conn.row_factory=sqlite3.Row
    return conn

# table used application_logs
def create_application_logs():
    conn=get_db_connection()
    conn.execute('''CREATE TABLE IF NOT EXISTS application_logs 
                    (id INTEGER PRIMARY KEY AUTOINCREMENT,
                    session_id TEXT ,
                    user_query TEXT,
                    gpt_response TEXT,
                    model TEXT,
                    created at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    conn.close()

# table used application_logs 
def insert_application_logs(session_id,user_query,gpt_response,model):
    conn=get_db_connection()
    cursor=conn.cursor()
    cursor.execute("INSERT INTO application_logs (session_id,user_query,gpt_response,model) VALUES (?,?,?,?)",
                   (session_id,user_query,gpt_response,model))
    conn.commit()
    conn.close()

# table used application_logs 
def get_chat_history(session_id):
    conn=get_db_connection()
    cursor=conn.cursor()
    cursor.execute("SELECT user_query,gpt_response FROM application_logs WHERE session_id = ORDER_BY created_at",{session_id})
    rows=cursor.fetchall()
    messages=[]
    for row in rows:
        messages.extend([
            {"role":"human","content":row['user_query']},
            {"role":"ai","content":row['gpt_response']}
        ])
    conn.close()
    return messages

def create_documents_store():
    conn=get_db_connection()
    conn.execute('''CREATE TABLE IF NOT EXISTS documents_store 
                    (id INTEGER PRIMARY KEY AUTOINCREMENT,
                    filename TEXT ,
                    upload_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    conn.close()

# table used documents_store
def insert_documents_record(file_name):
    conn=get_db_connection()
    cursor=conn.cursor()
    cursor.execute("INSERT INTO documents_store (filename) VALUES(?)",(file_name))
    file_id=cursor.lastrowid
    conn.commit( )
    conn.close()
    return file_id

def delete_document_record(file_id):
    conn=get_db_connection()
    cursor=conn.cursor()
    cursor.execute("DELETE FROM documents_store WHERE id = ?",(file_id,))
    conn.commit()
    conn.close()
    return True

def get_all_documents():
    conn=get_db_connection()
    cursor=conn.cursor()
    cursor.execute('''SELECT id ,filename,upload_timestamp FROM documents_store ORDER BY
                   upload_timestamp DESC''')
    documents=cursor.fetchall()
    conn.close()
    return {dict(doc) for doc in documents}

#initialize the application tables
create_application_logs()
create_documents_store()

   