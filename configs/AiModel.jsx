const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

    export const GenerateCourseLayoutAI = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a Course on the Following Details with Field as Course Name, Description, Along with the Chapter Name, about, Duration: Category:'Programming', Topic:Python, Level:Basic, Duration: 1 hours, NoOfChapters:5, in JSON Format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"CourseName\": \"Python for Beginners\",\n  \"Field\": \"Programming\",\n  \"Description\": \"This course provides a comprehensive introduction to Python programming, designed for individuals with little to no prior coding experience. You'll learn the fundamentals of Python syntax, data structures, and control flow, enabling you to write simple yet functional programs. By the end of the course, you'll have a solid foundation for further exploration in the world of Python programming.\",\n  \"Level\": \"Basic\",\n  \"Topic\": \"Python\",\n  \"Duration\": \"1 hour\",\n  \"NoOfChapters\": 5,\n  \"Chapters\": [\n    {\n      \"ChapterNumber\": 1,\n      \"ChapterName\": \"Introduction to Python\",\n      \"About\": \"This chapter covers the basics of Python, including its history, features, and uses. You'll learn how to install Python and set up your development environment. We will also cover what are IDEs and why they are helpful.\",\n      \"Duration\": \"12 minutes\",\n      \"Topics\": [\n        \"What is Python?\",\n        \"History and Features of Python\",\n        \"Uses of Python\",\n        \"Installing Python\",\n        \"Setting up a Development Environment (IDEs)\",\n        \"Running Your First Python Program\"\n      ]\n    },\n    {\n      \"ChapterNumber\": 2,\n      \"ChapterName\": \"Data Types and Variables\",\n      \"About\": \"This chapter introduces fundamental data types in Python, such as integers, floats, strings, and booleans. You'll learn how to declare and use variables to store data, and how to perform basic operations on these data types.\",\n      \"Duration\": \"12 minutes\",\n      \"Topics\": [\n        \"Integers\",\n        \"Floats\",\n        \"Strings\",\n        \"Booleans\",\n        \"Variables: Declaration and Assignment\",\n        \"Basic Arithmetic Operations\",\n        \"String Concatenation\"\n      ]\n    },\n    {\n      \"ChapterNumber\": 3,\n      \"ChapterName\": \"Control Flow: Conditional Statements\",\n      \"About\": \"This chapter focuses on control flow statements, specifically conditional statements (if, elif, else). You'll learn how to use these statements to make decisions based on conditions, allowing your programs to execute different code blocks based on different inputs.\",\n      \"Duration\": \"12 minutes\",\n      \"Topics\": [\n        \"If Statements\",\n        \"Elif Statements\",\n        \"Else Statements\",\n        \"Nested If Statements\",\n        \"Comparison Operators\",\n        \"Logical Operators (and, or, not)\"\n      ]\n    },\n    {\n      \"ChapterNumber\": 4,\n      \"ChapterName\": \"Control Flow: Loops\",\n      \"About\": \"This chapter covers the different types of loops in Python (for and while loops). You'll learn how to use these loops to repeat code blocks, making it easier to perform repetitive tasks. We will also discuss the use of `break` and `continue` statements.\",\n      \"Duration\": \"12 minutes\",\n      \"Topics\": [\n        \"For Loops\",\n        \"While Loops\",\n        \"Looping through Strings\",\n        \"Looping through Lists (Introduction)\",\n        \"Break Statement\",\n        \"Continue Statement\"\n      ]\n    },\n    {\n      \"ChapterNumber\": 5,\n      \"ChapterName\": \"Functions\",\n      \"About\": \"This chapter introduces the concept of functions. You'll learn how to define your own functions to encapsulate reusable code blocks. You'll also learn about function arguments and return values. This chapter will conclude with simple examples of using functions to solve problems.\",\n      \"Duration\": \"12 minutes\",\n      \"Topics\": [\n        \"Defining Functions\",\n        \"Calling Functions\",\n        \"Function Arguments (Positional and Keyword Arguments)\",\n        \"Return Values\",\n        \"Scope of Variables (Local vs. Global - basic introduction)\",\n        \"Simple Function Examples\"\n      ]\n    }\n  ]\n}\n```"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
