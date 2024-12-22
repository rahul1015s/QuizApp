import logo from "../assets/logo.png";  
export default function Header() {

    return(
        <header className="flex justify-center">
            <img src={logo} className="h-20 w-20 flex justify-center"/>
            <h1 className="font-bold text-yellow-100 flex justify-center mt-10">QQuiz</h1>
        </header>
    );
}