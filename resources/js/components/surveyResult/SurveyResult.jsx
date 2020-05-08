import React from 'react';
import Chart from "../chart/Chart";


const SurveyResult = () => {

    return (
        <div>
           <Chart title={'Question lorem ipsum 1?'} labels={['To jest bardzo długie pytanie i na pewno nie zmieści się w jednej lini. Coś jeszcze muszę tu napisać, ale nie wiem co. Może, albo nie.', 'B', 'C', 'D']} dataset={[100, 50, 33, 20]}/>
            <Chart title={'Question lorem ipsum 1?'} labels={['A', 'B', 'C', 'D','E','F', 'G', 'H', 'I', 'J']} dataset={[100, 50, 33, 20, 10, 5, 11, 1, 12,5]}/>
            <Chart title={'Question lorem ipsum 1?'} labels={['A', 'B', 'C', 'D']} dataset={[100, 50, 33, 20]}/>
        </div>
    );
};

export default SurveyResult;
