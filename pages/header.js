import React from 'react'
import Link from 'next/Link'
import { Menu } from 'antd'

class Header extends React.Component {
    render() {
        return(
            <div className="menu">
                 <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                >
                    <Menu.Item key="1">
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link href="/calculator">
                            <a>Calculator</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link  href="/contact">
                            <a>Apply for finance</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link  href="/bankCheck">
                            <a>Bank Statement Check</a>
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}

export default Header;