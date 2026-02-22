import { BrowserRouter, Route, Routes } from 'react-router';

import Home from '../pages/home';
import Error from '../pages/404Page';
import Navabar from '../layout/navbar';
import Footer from '../layout/footer';
import Intro from '../pages/intro';
import Principles from '../pages/principles';
import GeneralRules from '../pages/generalRules/generalRules';
import MoneySavingFormula from '../pages/moneySavingFormula/moneySavingFormula';
import ReduceSpeakingFormula from '../pages/reduceSpeakingFormula/reduceSpeakingFormula';
import TimeSavingFormula from '../pages/timeSavingFormula/timeSavingFormula';
import TourPlanFormula from '../pages/tourPlanFormula/tourPlanFormula';
import Works from '../pages/works/works';
import FoodControl from '../pages/foodControl/foodControl';
import Jahannam from '../pages/jahannam/jahannam';
import Jannat from '../pages/jannat/jannat';
import LoginPage from '../pages/loginPage';

const Index = () => {
  return (
    <BrowserRouter>
      <Navabar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/foodControl" element={<FoodControl />} />
        <Route path="/works" element={<Works />} />
        <Route path="/principles" element={<Principles />} />
        <Route path="/generalRules" element={<GeneralRules />} />
        <Route path="/moneySavingFormula" element={<MoneySavingFormula />} />
        <Route
          path="/reduceSpeakingFormula"
          element={<ReduceSpeakingFormula />}
        />
        <Route path="/timeSavingFormula" element={<TimeSavingFormula />} />
        <Route path="/tourPlanFormula" element={<TourPlanFormula />} />
        {/* <Route path="/myContract" element={<MyContract />} /> */}
        <Route path="/jahannam" element={<Jahannam />} />
        <Route path="/jannat" element={<Jannat />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Index;
