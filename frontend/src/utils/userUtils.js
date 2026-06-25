export function profilePicColorHelper(picId) {
  console.log(picId);
  switch (picId) {
    case 0:
      return 'white';
    case 1:
      return 'black';
    case 2: 
      return 'red';
    case 3: 
      return 'green';
    case 4: 
      return 'blue';
    default: 
      return 'white';
  }
}