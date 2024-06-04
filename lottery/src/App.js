// Components
// 1. stateless -> js function
// 2. stateful  -> js class
// 3. stateful  -> React Hooks -> js function

import Lottery from "./components/lottery";
import Container from "./components/container";

function App() { // stateless, top-level component
                 // View -> i. Component-Based ii. Virtual DOM iii. Declarative/Functional Programming
  return (
      <Container>
          <Lottery />
      </Container>
  );
}

export default App;
