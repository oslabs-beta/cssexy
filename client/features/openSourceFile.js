
const openSourceFile = async (path, line) => {
  // const line = lineNum !== undefined ? lineNum : 1;

  // console.log('openSourceFile: path', path);
  // console.log('openSourceFile: line', line);
  try {
  const fetchSourceFile = await fetch('/openSourceFile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({path, line}),
  });
  const resultFetchSourceFile = await fetchSourceFile.json();
  console.log('openSourceFile: resultFetchSourceFile', resultFetchSourceFile);
  }
  catch (error) {
    console.error({ error: 'Failed to open source path' });
  }
}

export { openSourceFile }
