var __assign = (this && this.__assign) || function () {
  __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
      }
      return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var material_1 = require("@mui/material");
var icons_material_1 = require("@mui/icons-material");
var react_router_dom_1 = require("react-router-dom");
var AuthContext = require("../../contexts/AuthContext");
var Sidebar = require("./Sidebar").default; // Renamed to Sidebar
var NotificationsMenu = require("./NotificationsMenu").default; // Renamed to NotificationsMenu
var styles_1 = require("@mui/material/styles");
var drawerWidth = 240;
var Main = (0, styles_1.styled)('main', { shouldForwardProp: function (prop) { return prop !== 'open'; } })(function (_a) {
  var theme = _a.theme, open = _a.open;
  return (__assign({ flexGrow: 1, padding: theme.spacing(3), transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
      }), marginLeft: "-".concat(drawerWidth, "px") }, (open && {
      transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
  })));
});
var MainLayout = function (_a) {
  var _b;
  var children = _a.children;
  var _c = (0, react_1.useState)(false), mobileOpen = _c[0], setMobileOpen = _c[1];
  var _d = (0, react_1.useState)(null), anchorEl = _d[0], setAnchorEl = _d[1];
  var _e = (0, react_1.useState)(null), notificationsAnchor = _e[0], setNotificationsAnchor = _e[1];
  var theme = (0, material_1.useTheme)();
  var isMobile = (0, material_1.useMediaQuery)(theme.breakpoints.down('sm'));
  var navigate = (0, react_router_dom_1.useNavigate)();
  var _f = (0, AuthContext.useAuth)(), user = _f.user, logout = _f.logout;
  var handleDrawerToggle = function () {
      setMobileOpen(!mobileOpen);
  };
  var handleProfileMenuOpen = function (event) {
      setAnchorEl(event.currentTarget);
  };
  var handleProfileMenuClose = function () {
      setAnchorEl(null);
  };
  var handleNotificationsOpen = function (event) {
      setNotificationsAnchor(event.currentTarget);
  };
  var handleNotificationsClose = function () {
      setNotificationsAnchor(null);
  };
  var handleLogout = function () {
      handleProfileMenuClose();
      logout();
  };
  var handleProfileClick = function () {
      handleProfileMenuClose();
      navigate('/profile');
  };
  var handleSettingsClick = function () {
      handleProfileMenuClose();
      navigate('/settings');
  };
  return (<material_1.Box sx={{ display: 'flex' }}>
    <material_1.CssBaseline />
    <material_1.AppBar position="fixed" sx={{
          width: { sm: "calc(100% - ".concat(drawerWidth, "px)") },
          ml: { sm: "".concat(drawerWidth, "px") },
      }}>
      <material_1.Toolbar>
        <material_1.IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
          <icons_material_1.Menu />
        </material_1.IconButton>
        <material_1.Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          SMDI Admin Panel
        </material_1.Typography>
        <material_1.IconButton color="inherit" onClick={handleNotificationsOpen}>
          <material_1.Badge badgeContent={((_b = user === null || user === void 0 ? void 0 : user.notifications) === null || _b === void 0 ? void 0 : _b.filter(function (n) { return !n.read; }).length) || 0} color="error">
            <icons_material_1.Notifications />
          </material_1.Badge>
        </material_1.IconButton>
        <material_1.IconButton color="inherit" onClick={handleProfileMenuOpen}>
          {(user === null || user === void 0 ? void 0 : user.profileImage) ? (<material_1.Avatar src={user.profileImage} alt={user.username}/>) : (<icons_material_1.AccountCircle />)}
        </material_1.IconButton>
      </material_1.Toolbar>
    </material_1.AppBar>

    <material_1.Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      <material_1.Drawer variant={isMobile ? 'temporary' : 'permanent'} open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{
          keepMounted: true, // Better open performance on mobile.
      }} sx={{
          '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
          },
      }}>
        <Sidebar />
      </material_1.Drawer>
    </material_1.Box>

    <Main open={!isMobile}>
      <material_1.Toolbar /> {/* Spacing for AppBar */}
      {children}
    </Main>

    {/* Profile Menu */}
    <material_1.Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileMenuClose} onClick={handleProfileMenuClose}>
      <material_1.MenuItem onClick={handleProfileClick}>
        <icons_material_1.AccountCircle sx={{ mr: 2 }}/>
        Profile
      </material_1.MenuItem>
      <material_1.MenuItem onClick={handleSettingsClick}>
        <icons_material_1.Settings sx={{ mr: 2 }}/>
        Settings
      </material_1.MenuItem>
      <material_1.Divider />
      <material_1.MenuItem onClick={handleLogout}>
        <icons_material_1.ExitToApp sx={{ mr: 2 }}/>
        Logout
      </material_1.MenuItem>
    </material_1.Menu>

    {/* Notifications Menu */}
    <NotificationsMenu anchorEl={notificationsAnchor} open={Boolean(notificationsAnchor)} onClose={handleNotificationsClose}/>
  </material_1.Box>);
};
export default MainLayout;
