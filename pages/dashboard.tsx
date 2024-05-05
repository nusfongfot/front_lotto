import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PersonIcon from "@mui/icons-material/Person";
import {
  Avatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useRouter } from "next/router";
import Information from "@/components/dashboard_page/information";
import Lotto from "@/components/dashboard_page/lotto";
import Head from "next/head";
import { deleteCookie } from "cookies-next";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import BillSale from "@/components/dashboard_page/billSale";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SimCardIcon from "@mui/icons-material/SimCard";
import ItemStore from "@/components/dashboard_page/itemStore";
import SendItem from "@/components/dashboard_page/sendItem";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BonusResult from "@/components/dashboard_page/bonusResult";
import BonusReport from "@/components/dashboard_page/bonusReport";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import Income from "@/components/dashboard_page/income";
import AnimationIcon from "@mui/icons-material/Animation";
import AwardStore from "@/components/dashboard_page/awardStore";
import MoneyIcon from "@mui/icons-material/Money";
import Profit from "@/components/dashboard_page/profit";
import Users from "@/components/dashboard_page/users";
import DiscountIcon from "@mui/icons-material/Discount";
import ChangePrice from "@/components/dashboard_page/changePrice";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import Banner from "@/components/dashboard_page/banner";

const menuSideBars = [
  {
    title: "ข้อมูลร้าน",
    icon: <SettingsIcon />,
    link: "dashboard?subpath=information",
    subpath: "information",
  },
  {
    title: "ลอตเตอรี่",
    icon: <ReceiptIcon />,
    link: "dashboard?subpath=lotto",
    subpath: "lotto",
  },
  {
    title: "ปรับราคาเร่งด่วน",
    icon: <DiscountIcon />,
    link: "dashboard?subpath=changePrice",
    subpath: "changePrice",
  },
  {
    title: "รายการสั่งซื้อ",
    icon: <ReceiptLongIcon />,
    link: "dashboard?subpath=billSale",
    subpath: "billSale",
  },
  {
    title: "รายการที่ฝากร้าน",
    icon: <SimCardIcon />,
    link: "dashboard?subpath=itemsStore",
    subpath: "itemsStore",
  },
  {
    title: "รายการที่ต้องจัดส่ง",
    icon: <ChecklistIcon />,
    link: "dashboard?subpath=sendItems",
    subpath: "sendItems",
  },
  {
    title: "ผลรางวัล",
    icon: <AttachMoneyIcon />,
    link: "dashboard?subpath=bonusResult",
    subpath: "bonusResult",
  },
  {
    title: "รายงานผู้ถูกรางวัล",
    icon: <PriceChangeIcon />,
    link: "dashboard?subpath=bonusReport",
    subpath: "bonusReport",
  },
  {
    title: "รายงานรายได้",
    icon: <PriceCheckIcon />,
    link: "dashboard?subpath=income",
    subpath: "income",
  },
  {
    title: "ผลรางวัลของร้าน",
    icon: <AnimationIcon />,
    link: "dashboard?subpath=awardStore",
    subpath: "awardStore",
  },
  {
    title: "รายงานกำไร",
    icon: <MoneyIcon />,
    link: "dashboard?subpath=profit",
    subpath: "profit",
  },
  {
    title: "ผู้ใช้งานระบบ",
    icon: <PersonIcon />,
    link: "dashboard?subpath=users",
    subpath: "users",
  },
  {
    title: "ป้ายโฆษณา",
    icon: <ViewCarouselIcon />,
    link: "dashboard?subpath=banner",
    subpath: "banner",
  },
];

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

export default function Dashboard() {
  const router = useRouter();
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openRightMenu = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    deleteCookie("tokenLotto");
    router.replace("/");
  };

  const renderRightMenu = () => {
    return (
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={openRightMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    );
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Head>
        <title>BBG BackOffice</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position='absolute' open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              sx={{ flexGrow: 1, textTransform: "capitalize" }}
            >
              {router.query.subpath}
            </Typography>
            <IconButton color='inherit' onClick={handleClick}>
              <Avatar sx={{ width: 24, height: 24 }} />
            </IconButton>
          </Toolbar>
        </AppBar>
        {renderRightMenu()}
        <Drawer variant='permanent' open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component='nav'>
            {menuSideBars.map((item, i) => (
              <Box key={i} onClick={() => router.push(`${item.link}`)}>
                <ListItemButton
                  sx={{
                    background:
                      router.query.subpath == item.subpath ? "#1976d2" : "",
                    ":hover": {
                      background:
                        router.query.subpath == item.subpath ? "#1976d2" : "",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color:
                        router.query.subpath == item.subpath
                          ? "#ffffff"
                          : "#000000",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      color:
                        router.query.subpath == item.subpath
                          ? "#ffffff"
                          : "#000000",
                    }}
                    primary={item.title}
                  />
                </ListItemButton>
              </Box>
            ))}
          </List>
        </Drawer>
        <Box
          component='main'
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "auto",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth='xl' sx={{ mt: 4, mb: 4 }}>
            {router.query.subpath == "information" ? <Information /> : null}
            {router.query.subpath == "lotto" ? <Lotto /> : null}
            {router.query.subpath == "billSale" ? <BillSale /> : null}
            {router.query.subpath == "itemsStore" ? <ItemStore /> : null}
            {router.query.subpath == "sendItems" ? <SendItem /> : null}
            {router.query.subpath == "bonusResult" ? <BonusResult /> : null}
            {router.query.subpath == "bonusReport" ? <BonusReport /> : null}
            {router.query.subpath == "income" ? <Income /> : null}
            {router.query.subpath == "awardStore" ? <AwardStore /> : null}
            {router.query.subpath == "profit" ? <Profit /> : null}
            {router.query.subpath == "users" ? <Users /> : null}
            {router.query.subpath == "changePrice" ? <ChangePrice /> : null}
            {router.query.subpath == "banner" ? <Banner /> : null}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
