async function handler({ selectedColor }) {
  const session = getSession();
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  if (!selectedColor) {
    return { error: "Color selection is required" };
  }

  try {
    await sql`
      INSERT INTO user_color_preferences (user_id, selected_color)
      VALUES (${session.user.id}, ${selectedColor})
      ON CONFLICT (user_id) DO UPDATE
      SET selected_color = ${selectedColor}
    `;

    return { success: true };
  } catch (error) {
    return { error: "Failed to save color preference" };
  }
}