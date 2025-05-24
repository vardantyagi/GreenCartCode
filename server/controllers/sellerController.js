import jwt from 'jsonwebtoken';

// login seller: /api/seller/login
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: 'Email and password are required' })
    }
    if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
      let sellerToken = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.cookie('sellerToken', sellerToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })

      res.json({ success: true, message: "Logged In" });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (e) {
    console.log('sellerController login error', e.message);
    res.json({ success: false, message: e.message });
  }
}

// check seller isAuth: /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
  try {
    res.json({ success: true });
  } catch (e) {
    console.log('sellerController check seller isAuth error', e.message);
    res.json({ success: false, message: e.message });
  }
}

// logout seller: /api/seller/logout
export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie('sellerToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });
    return res.json({ success: true, message: "Logged Out" });
  } catch (e) {
    console.log('sellerController logout error', e.message);
    res.json({ success: false, message: e.message });
  }
}