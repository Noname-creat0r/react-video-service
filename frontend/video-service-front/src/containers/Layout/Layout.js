import React, {Component} from 'react';

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

    sideDrawerCloseHandler = () => {
        this.setState( { showSideDrawer: false });
    }

    render() {
        return(
            <div>
                <Toolbar 
                    drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                    isOpen={this.state.showSideDrawer}
                    close={this.sideDrawerCloseHandler}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
};

export default Layout;