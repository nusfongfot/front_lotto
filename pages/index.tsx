import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import {
  dataFromGLO,
  getLottosListForSale,
  getLottosSearch,
} from "@/api/lotto";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import Head from "next/head";
import * as React from "react";
import PinInput from "react-pin-input";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useInfo from "@/zustand/auth";
import { createCart, listCart } from "@/api/cart";
import { successToast } from "@/utils/notification";
import { useCartStore } from "@/zustand/cart";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { DateLongTH } from "@/utils/numberWithComma";
import { getImageBanner } from "@/api/banner";
dayjs.extend(buddhistEra);

export default function Home() {
  const { accInfo } = useInfo();
  const { setCarts } = useCartStore();

  const [dateGLO, setDateGLO] = React.useState<string>("");
  const [valuePin, setValuePin] = React.useState<string>("");
  const [indexPin, setIndexPin] = React.useState<number>();
  const [lottos, setLottos] = React.useState<any[]>([]);
  const [banners, setBanners] = React.useState<any[]>([]);
  const [isNotFound, setIsNotFound] = React.useState(false);

  const handleChangePin = (value: string, index: number) => {
    setIndexPin(index);
    setValuePin(value);
  };

  const handleSearch = async () => {
    let position = "";
    if (indexPin == 1 || indexPin == 2 || indexPin == 3) {
      position = "start";
    } else {
      position = "end";
    }
    try {
      const res = await getLottosSearch(valuePin, position);
      if (res.data.length == 0) {
        setIsNotFound(true);
      } else {
        setIsNotFound(false);
      }
      setLottos(res.data);
    } catch (error) {
      return error;
    }
  };

  const handleGetCarts = async () => {
    try {
      const res = await listCart(accInfo.id);
      setCarts(res.data);
    } catch (error) {
      return error;
    }
  };

  const handleAddToCart = async (item: any) => {
    const body = {
      userId: accInfo.id,
      lottoId: item.id,
    };
    try {
      const res = await createCart(body);
      if (res.data) {
        successToast("add to cart successfully", 1000);
        handleGetCarts();
      }
    } catch (error) {
      return;
    }
  };

  const showImages = (path: string) => {
    const fullPath =
      process.env.NEXT_PUBLIC_BASEURL_PATH_IMAGE + "uploads/" + path;
    return (
      <img
        src={fullPath}
        style={{
          height: 350,
          width: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    );
  };

  React.useEffect(() => {
    (async () => {
      try {
        const res = await getLottosListForSale();
        const dataGLO = await dataFromGLO();
        const dataBanner = await getImageBanner();
        setBanners(dataBanner.data);
        setDateGLO(dataGLO.date);
        setLottos(res.data);
      } catch (error) {
        return error;
      }
    })();
  }, []);

  React.useEffect(() => {
    handleGetCarts();
  }, [accInfo.id]);

  return (
    <div>
      <Head>
        <title>BBG Lotto</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container maxWidth='xl' sx={{ mb: 3 }}>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          autoplay={true}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Autoplay, Navigation]}
          className='mySwiper'
        >
          {banners.map((item) => (
            <SwiperSlide key={item.path}>{showImages(item.path)}</SwiperSlide>
          ))}
        </Swiper>

        <Typography align='center' variant='h4' mt={2}>
          ลอตเตอรี่งวดวันที่ {DateLongTH(dateGLO)}
        </Typography>
        <Typography align='center' variant='h5' color={"red"}>
          ค้นหาเลขเด็ด!
        </Typography>

        <Stack
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <PinInput
            length={6}
            initialValue={valuePin}
            onChange={(value, index) => handleChangePin(value, index)}
            style={{ padding: "10px" }}
            inputStyle={{
              borderColor: "blue",
              height: 80,
              width: 80,
              fontSize: 32,
            }}
            inputFocusStyle={{ borderColor: "blue" }}
            autoSelect={true}
            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
          />
          <Button
            variant='contained'
            sx={{ height: 80, width: 80 }}
            onClick={handleSearch}
          >
            ค้นหา
          </Button>
        </Stack>

        {isNotFound && (
          <Typography variant='h4' align='center' mt={2}>
            ไม่พบลอตเตอรี่
          </Typography>
        )}

        <Grid container spacing={3} mt={3}>
          {lottos.map((item) => (
            <Grid item xs={12} sm={6} lg={3} key={item.id}>
              <Stack
                flexDirection={"row"}
                justifyContent={{ xs: "flex-start", sm: "center" }}
                alignItems={"center"}
              >
                <img
                  src='../assets/images/lotto.png'
                  style={{ width: 300, height: 150 }}
                />
                <Typography
                  sx={{
                    background: "rgba(220, 220, 121, 1)",
                    color: "black",
                    ml: "-155px",
                    mt: "-95px",
                    height: 40,
                  }}
                  variant='h4'
                  fontWeight={600}
                >
                  {item.number}
                </Typography>
              </Stack>
              <Stack flexDirection={"column"} alignItems={"center"}>
                <Typography align='center' color={"green"} variant='h5'>
                  {item.sale} ฿
                </Typography>
                <Button
                  startIcon={<ShoppingCartIcon />}
                  variant='contained'
                  onClick={() => handleAddToCart(item)}
                >
                  เลือกซื้อ
                </Button>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}