# Download Sources

## Description
Download all data sources referenced in app/data.ts for reproducibility

## Usage
```
/download-sources
```

## Use Case
This skill is for **reproducibility** - re-downloading all existing sources from scratch. The primary workflow for adding new sources is `/add-source`.

## Instructions

When the user invokes this skill, follow these steps:

### Step 1: Run the Download Script
- Use Bash tool to run: `npm run download-sources`
- The script will:
  - Read all sources from app/data.ts
  - Download each to the appropriate data-sources/ subdirectory
  - Create metadata.json with download results

### Step 2: Monitor Progress
- Watch the script output
- Report progress to the user
- The script will show:
  - Which sources are being downloaded
  - Success or failure for each
  - Total summary at the end

### Step 3: Read and Report Results
- After the script completes, read data-sources/metadata.json
- Parse the metadata to extract:
  - Total sources attempted
  - Number successful
  - Number failed
  - List of failed downloads (if any)

### Step 4: Provide Summary
- Report to user:
  ```
  Downloaded X of Y sources successfully

  Saved to:
  - data-sources/press-releases/: N files
  - data-sources/reports/: N files
  - data-sources/archives/: N files
  - data-sources/news/: N files

  Failed downloads (if any):
  - [Source name]: [Error reason]
  ```

### Step 5: List Downloaded Files
- Use Bash tool to list files in each category directory
- Show user what files are now available for parsing
- Suggest next steps: `/parse-source <filename>` or `/refresh-all`

## Error Handling
- If npm script fails to run: Check that scripts/download-sources.js exists
- If many sources fail: Check internet connection, suggest manual download
- If metadata.json not created: Report script error, suggest checking script output

## Next Steps
After downloading sources, user can:
- Run `/parse-source <filename>` to parse individual sources
- Run `/refresh-all` to parse all sources and update app/data.ts
- Manually review downloaded files in data-sources/ directory

## Tools Available
- Bash: Run npm script to download sources
- Read: Read metadata.json and downloaded files
- Write: Not needed (script handles writing)

## Notes
- This is a secondary workflow - most users will use `/add-source` instead
- Useful for re-creating the dataset from scratch
- Some sources may fail if URLs have changed or sites are down
- All downloaded files are saved in original format (HTML or PDF)
