//Task 1: Book Object
let book = {
    title: "The Alchemist",
    author: "Paulo Coelho",
    pages: 208,
    isRead: false
};

console.log("----- Task 1: Book Object -----");

console.log("--- Before Update ---");
console.log("Title:", book.title);
console.log("Author:", book.author);
console.log("Pages:", book.pages);
console.log("Is Read:", book.isRead);

book.isRead = true;
book.genre = "Adventure"; // added genre

console.log("--- After Update ---");
console.log("Title:", book.title);
console.log("Author:", book.author);
console.log("Pages:", book.pages);
console.log("Is Read:", book.isRead);
console.log("Genre:", book.genre);


//Task 2: Movies Array
let movies = [
    { title: "Inception", director: "Christopher Nolan", year: 2010 },
    { title: "The Matrix", director: "Lana & Lilly Wachowski", year: 1999 },
    { title: "Interstellar", director: "Christopher Nolan", year: 2014 }
];

console.log("\n-----Task 2: Movies Array -----");

console.log("--- Before Update ---");
movies.forEach((movie, i) => {
    console.log(`${i + 1}. ${movie.title}, ${movie.director}, ${movie.year}`);
});


movies.push({ title: "Avatar", director: "James Cameron", year: 2009 });

movies[0].year = 2023;

console.log("--- After Update ---");
movies.forEach((movie, i) => {
    console.log(`${i + 1}. ${movie.title}, ${movie.director}, ${movie.year}`);
});


//Task 3: Student Object
let student = {
    name: "Janverly",
    age: 20,
    subjects: ["Math", "Science", "History"]
};

console.log("\n----- Task 3: Student Object -----");


console.log("--- Before Update ---");
console.log("Name:", student.name);
console.log("Age:", student.age);
console.log("Subjects:", student.subjects.join(", "));

student.subjects.push("English"); // iaadd mo

console.log("--- After Update ---");
console.log("Name:", student.name);
console.log("Age:", student.age);
console.log("Subjects:", student.subjects.join(", "));


//Task 4: Recipe Object
let recipe = {
    name: "Pasta Salad",
    ingredients: [
        { name: "Pasta", quantity: "2 cups", isVegetarian: true },
        { name: "Tomatoes", quantity: "1 cup", isVegetarian: true },
        { name: "Chicken", quantity: "200g", isVegetarian: false }
    ]
};

console.log("\n----- Task 4: Recipe Object -----");

console.log("--- Before Update ---");
console.log("Recipe Name:", recipe.name);
recipe.ingredients.forEach((ing, i) => {
    console.log(`${i + 1}. ${ing.name}, ${ing.quantity}, Vegetarian: ${ing.isVegetarian}`);
});

recipe.ingredients.push({ name: "Olive Oil", quantity: "2 tbsp", isVegetarian: true }); // dito add ingredient

console.log("--- After Update ---");
console.log("Recipe Name:", recipe.name);
recipe.ingredients.forEach((ing, i) => {
    console.log(`${i + 1}. ${ing.name}, ${ing.quantity}, Vegetarian: ${ing.isVegetarian}`);
});
