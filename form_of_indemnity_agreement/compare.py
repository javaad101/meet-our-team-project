import re

filename = "/Users/advocatesclose/Documents/venv/documents/SPAC/form_of_indemnity_agreement/form_of_indemnity_agreement.html"

otherFile = "/Users/advocatesclose/Documents/venv/documents/SPAC/form_of_indemnity_agreement/revised_form_of_indemnity_agreement.html"

with open(filename, 'r') as file:
	content = file.read()

with open(otherFile, 'r') as file:
	otherContent = file.read()

pattern = r"[\S]+"
compiled = re.compile(pattern, re.DOTALL)
# let's just iterate through a document and print out ranges with matching spans.
for match in compiled.finditer(content):
    print(f"Match found at {match.start()}-{match.end()}: {match.group()}")

# lines = content.splitlines()
# pattern = lines[21]
# print(pattern)

# compiled = re.compile(pattern, re.DOTALL)
# wordPattern = r'(?P<word>[\w\s]+)'
# compiledWordPattern = re.compile(wordPattern)
# theCompiledWordPattern = compiledWordPattern.search(pattern)
# print(pattern)
# print(theCompiledWordPattern)
# match = compiled.search(otherContent)

# if match:
# 	print("Match found:")
# 	print(match)
# else:
# 	print("No match found.")
