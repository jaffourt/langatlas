import React, {PropsWithChildren} from 'react';
import MainWrapper from "./components/MainWrapper";
import SubjectsTableAndExplore from "./components/SubjectsTable";

const ExploreAtlas = (props: PropsWithChildren<any>) => {

    return (
        <MainWrapper>
            <SubjectsTableAndExplore/>
        </MainWrapper>
    );
};

export default ExploreAtlas;