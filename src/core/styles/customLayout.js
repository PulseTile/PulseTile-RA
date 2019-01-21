/**
 * This component returns stylesheet for custom layout
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {shape}
 */
export default {
    root: {
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
        minHeight: '100vh',
        position: 'relative',
    },
    appFrame: {
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'auto',
    },
    sidebarBlock: {
        maxWidth: "240px",
        '& div': {
            marginTop: "0px",
        },
    },
    contentWithSidebar: {
        display: 'flex',
        flexGrow: 1,
    },
    content: {
        display: "block",
        flexDirection: 'column',
        flexGrow: 2,
        padding: 0,
    },
};