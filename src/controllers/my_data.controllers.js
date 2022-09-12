async function my_data (req, res) {
    const user = res.locals.user;

    try {
        res.send(user);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);  
    }
};

export default my_data;