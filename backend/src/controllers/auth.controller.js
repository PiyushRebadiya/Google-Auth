export const googleLogin = async (req, res) => {
  try {
    const { user } = req;
    // Here you can store/find user in your SQL DB
    // Example:
    // const dbUser = await User.findOrCreate({ uid: user.uid, email: user.email });

    res.status(200).json({
      message: "Google login verified successfully",
      user: {
        uid: user.uid,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
