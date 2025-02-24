async function handler({ username }) {
    if (!username) {
      return { error: "Username is required" };
    }
  
    const user = await sql`
      SELECT selected_color FROM users WHERE username = ${username}
    `;
  
    if (!user.length) {
      return { error: "User not found" };
    }
  
    const gridSize = 6;
    const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const grid = [];
    const userColor = user[0].selected_color;
  
    for (let i = 0; i < gridSize; i++) {
      const row = [];
      for (let j = 0; j < gridSize; j++) {
        const char = characters[Math.floor(Math.random() * characters.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        row.push({ char, color });
      }
      grid.push(row);
    }
  
    const [userChar, userColorValue] = userColor.split("-");
    const randomRow = Math.floor(Math.random() * gridSize);
    const randomCol = Math.floor(Math.random() * gridSize);
    grid[randomRow][randomCol] = { char: userChar, color: userColorValue };
  
    return {
      grid,
      size: gridSize,
      userSequence: userColor,
    };
  }
  