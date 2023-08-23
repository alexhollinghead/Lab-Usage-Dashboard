import csv


def find_matching_rows(filename):
    with open(filename, "r") as file:
        reader = csv.reader(file)
        seen = {}
        duplicates = []

        for line_num, row in enumerate(
            reader, 1
        ):  # Starts enumeration from 1 for line numbers
            # Create a tuple with values from columns 0, 1, 2, and 6
            key = (row[0], row[1], row[2], row[6])

            if key in seen:
                duplicates.append((seen[key], row))
                duplicates.append((line_num, row))
            else:
                seen[key] = line_num

        return duplicates


filename = "/Users/alex/Documents/Work/DLL/Lab Usage/sp23-app-usage.csv"
duplicate_lines = find_matching_rows(filename)

print("Line numbers with matching entries in columns 0, 1, 2, and 6:")
for line_num in duplicate_lines:
    print(f"Line {line_num}")
