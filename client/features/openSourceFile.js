
const openSourceFile = async (file, line) => {
  const lineNum = line !== undefined ? line : 1;
  try {
  const fetchSourceFile = await fetch('/openSourceFile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({file, lineNum}),
  });
  const resultFetchSourceFile = await fetchSourceFile.json();
  console.log('openSourceFile: resultFetchSourceFile', resultFetchSourceFile);
  }
  catch (error) {
    console.error({ error: 'Failed to open source file' });
  }
}

export { openSourceFile }
