
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var material_1 = require("@mui/material");
var icons_material_1 = require("@mui/icons-material");
var react_router_dom_1 = require("react-router-dom");
var AuthContext_1 = require("../../contexts/AuthContext");
var user_1 = require("../../types/user");
var menuItems = [
    { text: 'Dashboard', icon: <icons_material_1.Dashboard />, path: '/dashboard', roles: [] },
    {
        text: 'Electrical System',
        icon: <icons_material_1.ElectricBolt />,
        path: '/electrical-system',
        roles: [user_1.UserRole.ADMIN, user_1.UserRole.STAFF],
    },
    {
        text: 'Energy Audit',
        icon: <icons_material_1.Assessment />,
        path: '/energy-audit',
        roles: [user_1.UserRole.ADMIN, user_1.UserRole.STAFF],
    },
    {
        text: 'System Tools',
        icon: <icons_material_1.Build />,
        path: '/system-tools',
        roles: [user_1.UserRole.ADMIN, user_1.UserRole.STAFF, user_1.UserRole.MODERATOR],
    },
    {
        text: 'Testing',
        icon: <icons_material_1.Speed />,
        path: '/testing',
        roles: [user_1.UserRole.ADMIN, user_1.UserRole.STAFF],
    },
    {
        text: 'TAM Evaluation',
        icon: <icons_material_1.Poll />,
        path: '/tam-evaluation',
        roles: [user_1.UserRole.ADMIN, user_1.UserRole.MODERATOR],
    },
    {
        text: 'User Management',
        icon: <icons_material_1.People />,
        path: '/users',
        roles: [user_1.UserRole.ADMIN],
    },
    {
        text: 'Admin Settings',
        icon: <icons_material_1.Settings />,
        path: '/admin',
        roles: [user_1.UserRole.ADMIN],
    },
];
var Sidebar = function () {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var location = (0, react_router_dom_1.useLocation)();
    var user = (0, AuthContext_1.useAuth)().user;
    var handleNavigation = function (path) {
        navigate(path);
    };
    var isRouteAccessible = function (roles) {
        if (!roles.length)
            return true;
        if (!user)
            return false;
        return roles.includes(user.role);
    };
    return (<material_1.Box sx={{ p: 2, height: '100%', color: 'white' }}>
      <material_1.Box sx={{ mb: 4, mt: 2, textAlign: 'center' }}>
        <material_1.Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          SMDI
        </material_1.Typography>
        <material_1.Typography variant="subtitle2">Admin Panel</material_1.Typography>
      </material_1.Box>
      <material_1.Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.12)', mb: 2 }}/>
      <material_1.List>
        {menuItems.map(function (item) {
            return isRouteAccessible(item.roles) && (<material_1.ListItem button key={item.text} onClick={function () { return handleNavigation(item.path); }} sx={{
                    mb: 1,
                    borderRadius: 1,
                    bgcolor: location.pathname === item.path
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'transparent',
                    '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.12)',
                    },
                }}>
                <material_1.ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  {item.icon}
                </material_1.ListItemIcon>
                <material_1.ListItemText primary={item.text} primaryTypographyProps={{
                    fontSize: '0.9rem',
                    fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                }}/>
              </material_1.ListItem>);
        })}
      </material_1.List>
    </material_1.Box>);
};
export default Sidebar;
