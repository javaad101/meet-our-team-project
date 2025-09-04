import glob, os, shutil
from pathlib import Path

filename = "/Users/advocatesclose/Documents/venv/documents/SPAC/risk_factors/your_vote_wont_matter"
# List all html files in /risk_factors directory
html_files = glob.glob("/Users/advocatesclose/Documents/venv/documents/SPAC/risk_factors/*.html")
file = html_files[1]
def get_filename(html_file):
    return html_file.split("/")[-1]

def remove_extension(html_file):
    return html_file.split(".")[0]

def make_folder(directory):
    path = "/Users/advocatesclose/Documents/venv/documents/SPAC/risk_factors/"
    file_path = os.path.join(path, directory)
    # Create a Path object for the directory
    directory_path = Path(file_path)
    if not os.path.exists(directory_path):
        os.makedirs(directory_path)
        print("I made a new directory:", directory_path)

# Move file to directory
def move_file_to_directory(file, directory):
    path = "/Users/advocatesclose/Documents/venv/documents/SPAC/risk_factors/"
    file_path = os.path.join(path, directory)
    # Create a Path object for the directory
    directory_path = Path(file_path)
    shutil.move(file, directory_path)
    print("Moved file:", file, "to directory:", directory_path)


def make_new_directory(directory):
    path = "/Users/advocatesclose/Documents/venv/documents/SPAC/risk_factors/"
    file_path = os.path.join(path, directory)
    # Create a Path object for the directory
    directory_path = Path(file_path)
    print(f"DIRECTORY: {directory_path}")
    # The mkdir() method with arguments:
    # parents=True creates any missing parent directories.
    # exist_ok=True prevents an error if the directory already exists.
    directory_path.mkdir(parents=True, exist_ok=True)
    with open(f"{directory_path}/index.html", 'w') as file:
        file.write("This is a test file.")


html_files = glob.glob("/Users/advocatesclose/Documents/venv/documents/SPAC/risk_factors/*.html")

for file in html_files:
    html_filename = get_filename(file)
    print(html_filename)
    folder = remove_extension(html_filename)
    print(folder)
    make_new_directory(folder)
    make_folder(folder)
    move_file_to_directory(file, folder)


# print(f"Directory '{directory_path}' created or already exists.")
