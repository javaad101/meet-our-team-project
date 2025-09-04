import json
import re, glob

html = r'</?\w.*?>'
html_pattern = re.compile(html, re.DOTALL| re.MULTILINE)

leading_whitespace = r"^\s+"
leading_whitespace_pattern = re.compile(leading_whitespace, re.MULTILINE)

filename = "/Users/advocatesclose/Documents/venv/documents/SPAC/risk_factors/going_concern_risk/going_concern_risk.html"
with open(filename, "r") as file:
    content = file.read()
    content = html_pattern.sub("", content)
    content = leading_whitespace_pattern.sub("", content)

# print(content)
candidate_document_filename = "/Users/advocatesclose/Documents/venv/documents/SPAC/risk_factors/cross_border_acquisitions_are_difficult/cross_border_acquisitions_are_difficult.html"
def open_document(filename):
    with open(filename, "r") as file:
        content = file.read()
        content = html_pattern.sub("", content)
        content = leading_whitespace_pattern.sub("", content)
        return content

candidate_document = open_document(candidate_document_filename)

counter = 0
lines = []
candidate_lines = []
for line in content.splitlines():
    if line.strip():
        line = leading_whitespace_pattern.sub("", line)  # Only print non-empty lines
        # print(line)
        
    
for line in candidate_document.splitlines():
    if line.strip():  # Only print non-empty lines
        line = leading_whitespace_pattern.sub("", line)
        candidate_lines.append(line)
candidate_counter = 0
search_line = ""
for candidate_line in candidate_lines:
    candidate_line = leading_whitespace_pattern.sub("", candidate_line)
    candidate_counter += 1
    # print(f"{candidate_counter} : {candidate_line}")
    search_line = candidate_line


    
    
data = {}
json_files = glob.glob(
    "/Users/advocatesclose/Documents/venv/documents/SPAC/risk_factors/*.json", recursive=True)
html_files = glob.glob(
    "/Users/advocatesclose/Documents/venv/documents/SPAC/risk_factors/**/*.html", recursive=True)

pattern = "Our shareholders may face difficulties in protecting their interest against members of our management team who are located outside of the United States."
d = {}
def get_search_pattern_from_json(file):
    with open(file, "r", encoding="utf-8") as f:
        data = f.read()
        # print(data["heading"])
        print(file)
        # d["json_file"] = file
        # d["heading"] = data["heading"]    
        # return data["heading"]

def search_all_files(pattern, files):
    # print(pattern)
    search_pattern = re.compile(pattern)
    for file in files:
        # print(f"Checking file: {html_file}")
        with open(file, "r", encoding="utf-8") as hf:
            # print(f"Checking file: {html_file}")
            html_content = hf.read()
            html_content = html_pattern.sub("", html_content)
            html_content = leading_whitespace_pattern.sub("", html_content)
            # print(html_content)
            # print(f"Searching html content for {search_pattern}")
        matches = search_pattern.findall(html_content)
        if matches:
            print(f"\nFound {matches}\nin {file}\n")
            d["html_file"] = file
            d["matches"] = matches
            return d

pattern = "Our shareholders may face difficulties in protecting their interest against members of our management team who are located outside of the United States."
search_all_files(pattern, html_files)
search_all_files(pattern, json_files)

    
for file in json_files:
    heading = get_search_pattern_from_json(file)
    # print(f"Searching for pattern from {file}: {pattern}")
    search_all_files(heading, html_files)
print(d)
print(d["json_file"])
filename = d["json_file"].split("/")[-1].split(".")[0]
print(filename)
# create directory with filename
# copy into directory the json file and the html file
# do this for all of the json files in the directory
import os
import shutil

directory = f"/Users/advocatesclose/Documents/venv/documents/SPAC/risk_factors/{filename}"
def create_directory(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)
# copy json and html files into directory
def copy_files_to_directory(directory, d):
    shutil.copy(d["json_file"], directory)
    shutil.copy(d["html_file"], directory)
    print(f"Copied files to {directory}")

def do_for_all_json_files(json_files):
	for file in json_files:
		heading = get_search_pattern_from_json(file)
		search_all_files(heading, html_files)
		filename = d["json_file"].split("/")[-1].split(".")[0]
		directory = f"/Users/advocatesclose/Documents/venv/documents/SPAC/risk_factors/{filename}"
		create_directory(directory)
		copy_files_to_directory(directory, d)

# do_for_all_json_files(json_files)
do_for_all_json_files(html_files)