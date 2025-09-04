import re, glob

html = r"<.+?\n?.*?>"
html_pattern = re.compile(html)

leading_whitespace = r"^\s+"
leading_whitespace_pattern = re.compile(leading_whitespace, re.MULTILINE)

filename = "/Users/advocatesclose/Documents/venv/documents/SPAC/risk_factors/going_concern_risk/going_concern_risk.html"
with open(filename, "r") as file:
    content = file.read()
    content = html_pattern.sub("", content)
    content = leading_whitespace_pattern.sub("", content)

# print(content)

counter = 0
for line in content.splitlines():
    # print(line)
    counter += 1
    # if not html in line:
    
    # line = leading_whitespace_pattern.sub("", line)

    if line.strip():  # Only print non-empty lines
        print(f"{counter}: {line}")
    # print(f"{counter}: {line}")
    #     find = line
    #     print(find)
    #     pattern = re.compile(find)
    #     matches = pattern.search(content)
    #     if matches:
    #         print(f"Found a match in {filename}: {matches.group(0)}")
    #     files = glob.glob("/Users/advocatesclose/Documents/venv/documents/SPAC/risk_factors/**/*.html")

    #     for file in files: 
    #         # print(f"Checking file: {file}")
    #         with open(file, "r") as f: 
    #             content = f.read() 
    #             matches = pattern.search(content) 
    #             if matches: 
    #                 print(f"Found a match in {file}: {matches.group(0)}") 
    #             else: 
    #                 pass
    #                 # print(f"No matches found in {file}")