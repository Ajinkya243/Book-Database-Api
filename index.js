const {initializeDatabase}=require('./db/db.connect');
const {Book}=require("./models/book.models");
const express=require('express');
const cors = require("cors");
const app=express();
app.use(cors());
app.use(express.json());
initializeDatabase();

const port=3000;
app.listen(port,()=>{
    console.log(`Express server running on ${port}`)
})

const addBook=async(data)=>{
    const book=await Book(data);
    book.save();
    return book;
}

const readAllBooks=async()=>{
    const books=await Book.find();
    return books;
}

const findBookByTitle=async(title)=>{
    const book=await Book.find({title:title});
    return book;
}

const findBookByAuthor=async(author)=>{
    const book=await Book.find({author:author});
    return book;
}

const findBookByGenre=async(genre)=>{
    const book=await Book.find({genre:genre});
    return book;
}

const findBookByReleaseYear=async(year)=>{
    const book=await Book.find({publishedYear:year});
    return book;
}

const findAndUpdate=async(name,rating)=>{
    const book=await Book.findOneAndUpdate({title:name},rating,{new:true});
    console.log(book);
    return book;
}

const deleteBook=async(id)=>{
    const book=await Book.findByIdAndDelete(id);
    return book;
}

app.delete("/books/:id",async(req,resp)=>{
    try{
        const book=await deleteBook(req.params.id);
       
            resp.status(201).json({message:'Book sucessfully deleted.'})
        
        
    }
    catch(error){
        resp.status(404).json({error:"Book not found"})
    }
})

app.post("/books/:name",async(req,resp)=>{
    try{
        const book=await findAndUpdate(req.params.name,req.body);
        if(book){
            resp.status(201).json({message:"Book updated sucessfully",book});
        }
        else{
            resp.status(404).json({error:"Book not found"});
        }
    }
    catch(error){
        resp.status(500).json({error:'Error occur while fetching books'})
    }
})

app.get("/books/releaseYear/:year",async(req,resp)=>{
    try{
        const book=await findBookByReleaseYear(req.params.year);
        if(book.length){
            resp.json({book});
        }
        else{{
            resp.status(404).json({error:'Book not found.'});
        }}
    }
    catch(error){
       resp.status(500).json({error:"Error occur while fetching book."}) 
    }
})


app.get("/books/genre/:genre",async(req,resp)=>{
    try{
    const book=await findBookByGenre(req.params.genre);
    if(book.length){
        resp.json({book});
    }
    else{
        resp.status(404).json({error:'Book not found.'})
    }
}
catch(error){
    resp.status(500).json({error:"Error occur while fetching data."})
}
})

app.get("/books/author/:author",async(req,resp)=>{
    try{
        const book=await findBookByAuthor(req.params.author);
        if(book.length){
            resp.json({book});
        }
        else{
            resp.status(404).json({error:"Book not found."})
        }
    }
    catch(error){
        resp.status(500).json({error:'Error occur while fetching data.'})
    }
})


app.get("/books/:title",async(req,resp)=>{
    const book=await findBookByTitle(req.params.title);
    if(book.length){
        resp.json({book});
    }
    else{
        resp.status(404).json({error:'Book not found.'})
    }
})

app.get("/books",async(req,resp)=>{
    try{
        const books=await readAllBooks();
        if(books.length){
            resp.json({books});
        }
        else{
            resp.status(404).json({error:'Books not found'})
        }
    }
    catch(error){
        resp.status(500).json({error:"Error while fetching data"})
    }
})

// app.post("/books",async(req,resp)=>{
//     try{
//         const book=addBook(req.body);
//         resp.status(201).json({message:'Book saved.'})
//     }
//     catch(error){
//         resp.status(500).json({error:'Error occur while sabving book data.'})
//     }
// })

app.get("/",(req,resp)=>{
    resp.send("Welcome to book database api.")
})

// const books=[
//     {
//         "title": "Lean In",
//         "author": "Sheryl Sandberg",
//         "publishedYear": 2012,
//         "genre": ["Non-fiction", "Business"],
//         "language": "English",
//         "country": "United States",
//         "rating": 4.1,
//         "summary": "A book about empowering women in the workplace and achieving leadership roles.",
//         "coverImageUrl": "https://example.com/lean_in.jpg"
//       },
      
//         {
//             "title": "Shoe Dog",
//             "author": "Phil Knight",
//             "publishedYear": 2016,
//             "genre": ["Autobiography", "Business"],
//             "language": "English",
//             "country": "United States",
//             "rating": 4.5,
//             "summary": "An inspiring memoir by the co-founder of Nike, detailing the journey of building a global athletic brand.",
//             "coverImageUrl": "https://example.com/shoe_dog.jpg"
//           }
      
// ]

app.get("/book",async(req,resp)=>{
    resp.json({books});
})

