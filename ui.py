# ui source: https://www.youtube.com/watch?v=ibf5cx221hk
# docs used: https://dev.mysql.com/doc/connector-python/en/connector-python-installation.html

# import necessary libraries
import tkinter as tk  # main GUI library
from tkinter import messagebox  # for showing popup messages
import mysql.connector  # MySQL database connector
from mysql.connector import errorcode  # for handling specific database errors
import datetime  # for date validation

# database connection setup
try:
    # establish connection to MySQL/MariaDB database
    cnx = mysql.connector.connect(
        user='root',  # database username
        password='',  # database password
        host='localhost',  # database server location
        database='gobesi',  # database name to connect to
        charset='utf8mb4',  # character encoding for the connection
        collation='utf8mb4_general_ci'  # sorting rules for text comparison (nagloloko pag wala)
    )
    # create a cursor object to execute SQL queries
    cursor = cnx.cursor()
except mysql.connector.Error as err:
    # show error message if connection fails
    messagebox.showerror("Database Error", f"Could not connect to database:\n{err}")
    exit()  # exit the program if connection fails

# create the main application window
root = tk.Tk()  # initialize the main window
root.geometry("1366x768")  # set window size (width x height)
root.title("Student Organization Management System")  # set window title

# create and display a label widget
label = tk.Label(
    root,  # parent widget (main window)
    text="GoBeSi",  # text to display
    font=('Arial', 18)  # font style and size
)
label.pack(padx=20, pady=20)  # add to window with padding

# create a multi-line text box
textbox = tk.Text(
    root,  # parent widget
    font=('Arial', 16),  # font settings
    height=5  # visible height in lines
)
textbox.pack(pady=10)  # add to window with vertical padding

# create form fields dynamically
fields = [
    ("Student Number", 10),  # field label and max length
    ("First Name", 50),
    ("Middle Name", 20),
    ("Last Name", 20),
    ("Degree Program", 10),
    ("Gender", 1),
    ("Birthdate (YYYY-MM-DD)", 10),
    ("Username", 20),
    ("Password", 20)
]

# dictionary to store all entry widgets
entries = {}

# create labels and entry fields for each field
for field, width in fields:
    # create label for the field
    tk.Label(root, text=field).pack()
    
    # create entry (text input) widget
    entry = tk.Entry(
        root,  # parent widget
        width = width  # width
    )
    entry.pack(pady=5)  # add to window with vertical padding
    
    # store reference to the entry widget
    entries[field] = entry

# function to handle button click
def on_button_click():
    # get all data from entry fields
    data = {}

    # loop through each item (key-value pair) in the 'entries' dictionary
    for field, entry in entries.items():
        
        # get the user input from the entry field
        user_input = entry.get()
        
        # remove leading/trailing whitespace from the input
        trimmed_input = user_input.strip()
        
        # store it in the 'data' dictionary with the field as the key
        data[field] = trimmed_input

    # validate required fields
    for key, value in data.items():
        if not value:  # check if field is empty
            messagebox.showwarning("Input Error", f"{key} is required.")
            return  # exit function if validation fails

    # validate gender field
    if data["Gender"].upper() not in ("M", "F"):
        messagebox.showwarning("Input Error", "Gender must be 'M' or 'F'.")
        return

    # validate date format
    try:
        datetime.datetime.strptime(data["Birthdate (YYYY-MM-DD)"], "%Y-%m-%d")
    except ValueError:
        messagebox.showwarning("Input Error", "Birthdate must be in YYYY-MM-DD format.")
        return

    # insert data into database
    try:
        # execute SQL INSERT command
        cursor.execute("""
            INSERT INTO student (
                student_number, first_name, middle_name, last_name, 
                degree_program, gender, birthdate, username, password
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            data["Student Number"], data["First Name"], data["Middle Name"], 
            data["Last Name"], data["Degree Program"], data["Gender"].upper(), 
            data["Birthdate (YYYY-MM-DD)"], data["Username"], data["Password"]
        ))
        
        # commit the transaction
        cnx.commit()
        
        # show success message
        messagebox.showinfo("Success", "Student record created successfully!")
        
        # clear all entry fields
        for entry in entries.values():
            entry.delete(0, tk.END)
            
    except mysql.connector.Error as err:
        # show error message if database operation fails
        messagebox.showerror("Database Error", str(err))
        # rollback any changes if error occurs
        cnx.rollback()

# create submit button
tk.Button(
    root,  # parent widget
    text="Create Student",  # button text
    font=('Arial', 16),  # font settings
    command=on_button_click  # function to call when clicked
).pack(pady=20)  # add to window with vertical padding

# start the main application loop
root.mainloop()

# clean up resources when window is closed
cursor.close()  # close database cursor
cnx.close()  # close database connection