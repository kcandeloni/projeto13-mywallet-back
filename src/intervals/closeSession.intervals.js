import conection from "../db/db.js";

let db = await conection();

async function closeSessions (HOUR){

    const timeSession = Date.now() - (HOUR * 2);
    try {
        await db
            .collection("sessions")
            .deleteMany({ dateLogin: { $lte: timeSession } });
    }catch (error) {
    console.error(error.message);
    }
}

export default closeSessions;