import React from 'react';

const Blog = () => {
    return (
        <div className='container my-5 lg:px-24'>
            <h3 className='text-center my-3'>Blogs</h3>

            <div className='grid grid-cols-2 gap-5'>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">How will you improve the performance of a React Application?</h2>
                        <p> Using Immutable Data Structures.Function/Stateless Components and React.PureComponent.Multiple Chunk Files.Dependency optimization.Avoid Inline Function Definition in the Render Function.Throttling and Debouncing Event Action in JavaScript. Avoid using Index as Key for map. Avoiding Props in Initial States</p>


                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">What are the different ways to manage a state in a React application?</h2>

                        <p> Local (UI) state – Local state is data we manage in one or another component.</p>
                        <p> Global (UI) state – Global state is data we manage across multiple components.</p>
                        <p> Server state – Data that comes from an external server that must be integrated with our UI state.</p>
                        <p> URL state – Data that exists on our URLs, including the pathname and query parameters.</p>


                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title"> Why you do not set the state directly in React. For example, if you have const [products, setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts</h2>

                        <p>
                            because useSate return one variable and one function ,when we setProducts its give more Advantage. state variable there dicler when we change setProducts data, then auto update state variable data, and re randaring. setProducts chagne the value of state variable and re randaring dom.
                        </p>


                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title"> How does prototypical inheritance work?</h2>

                        <p> What is prototype based inheritance?
                            Prototype-based programming is a style of object-oriented programming in which behaviour reuse is performed via a process of reusing existing objects that serve as prototypes. This model can also be known as prototypal, prototype-oriented, classless, or instance-based programming.</p>
                        <p>
                            example: engineers may complete a working model prototype to test a product before it is approved for manufacturing.
                        </p>


                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?</h2>

                        <p>arrayOfProudts.find(pd = pd.name.indcludes('serachName'))</p>
                        <p>
                            we starting a loop . and there find serach key.
                        </p>


                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">What is a unit test? Why should write unit tests?

                        </h2>

                        <p>This is a type of testing which is done by software developers in which the smallest testable module of an application - like functions, procedures or interfaces - are tested to ascertain if they are fit to use.
                        </p>
                        <p>Unit testing allows software developers to actually think through the design of the software and what has to be done before they write the code. This can help them to stay focused and can also help them to create much better designs.
                        </p>


                    </div>
                </div>

            </div>

        </div>
    );
};

export default Blog;