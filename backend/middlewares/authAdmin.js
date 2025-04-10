import jwt from "jsonwebtoken";

//admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const {admintoken}  = req.headers;
        console.log('admintoken', admintoken);
        if (!admintoken) {
            return res.status(401).json({ success: false, message: "Unauthorized access" });
        }
        
        const token_decode = jwt.verify(admintoken, process.env.JWT_SECRET);
        if ( token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ success: false, message: "Not Authorized Login Again!" });
        }

        next();
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ success: false, message: error.message });
        
    }
};

export default authAdmin;