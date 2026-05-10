
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function SidebarComponent() {
    const [visibleRight, setVisibleRight] = useState(false);

    return (
        <div className="card w-full h-full flex justify-center items-center">
            <div className="flex gap-2 justify-center items-center text-2xl">
                <Button
                    icon={<GiHamburgerMenu />}
                    onClick={() => setVisibleRight(true)}
                />
            </div>

            <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)} className='bg-zinc-600'>
                <h2>Right Sidebar</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </Sidebar>
        </div>
    )
}
