async function handler({ username, colorSequence }) {
    if (!username || !colorSequence) {
      return { error: "Missing required fields" };
    }
  
    try {
      const rateLimit = await sql`
        SELECT COUNT(*) 
        FROM users 
        WHERE username = ${username}
        AND created_at > NOW() - INTERVAL '15 minutes'
      `;
  
      if (rateLimit[0].count > 5) {
        return { error: "Too many attempts. Please try again later." };
      }
  
      const user = await sql`
        SELECT user_id, username, selected_color 
        FROM users 
        WHERE username = ${username}
      `;
  
      if (user.length === 0) {
        return { error: "Invalid credentials" };
      }
  
      if (user[0].selected_color !== colorSequence) {
        return { error: "Invalid credentials" };
      }
  
      await sql`
        UPDATE users 
        SET created_at = CURRENT_TIMESTAMP 
        WHERE user_id = ${user[0].user_id}
      `;
  
      const sessionToken = crypto.randomBytes(32).toString("hex");
  
      return {
        success: true,
        sessionToken,
        user: {
          id: user[0].user_id,
          username: user[0].username,
        },
      };
    } catch (error) {
      return { error: "Authentication failed" };
    }
  }
  