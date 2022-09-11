
export async function meus_dados (req, res) {
    const user = res.locals.user;

    try {
        res.send(user);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);  
    }
};