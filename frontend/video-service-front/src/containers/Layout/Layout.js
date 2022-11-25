import React, {Component} from 'react';

import Wrapper from '../../hoc/Wrapper/Wrapper';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import './Layout.css';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render() {
        return(
            <Wrapper>
                <Toolbar 
                    drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                    open={this.state.showSideDrawer}
                   />
                <main>
                    {this.props.children}
                </main>
            </Wrapper>
        )
    }
};

export default Layout;