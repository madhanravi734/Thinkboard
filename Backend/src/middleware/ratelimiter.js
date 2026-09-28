import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const result = await ratelimit.limit("my-limit-key");

        console.log("RATE LIMIT RESULT:", result);

        if (!result.success) {
            return res.status(429).json({
                message: "Too many requests"
            });
        }

        next();

    } catch (error) {
        console.error("Rate limit error", error);
        next(error);
    }
};

export default rateLimiter;