import app from '../app.js';



const main = async () => {

    

    const PORT = process.env.PORT || '3000';

    app.listen(parseInt(PORT, 10), () => {

        console.log(`Listening on port ${PORT}`);
        
    });
}


main().catch(err => {
    console.error('An error occurred during the server initialization:', err);
})