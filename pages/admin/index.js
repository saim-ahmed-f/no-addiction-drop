import { useEffect } from "react";

import Dashboard from "../../adminComponent/dashboard";

import { useRouter } from "next/router";




export const getStaticProps = async () => {
  const res = await fetch(
    "https://alcoban-vbk7q.ondigitalocean.app/Orders/product_detail_by_limit/10/"
  );
  const data = await res.json();

  const res2 = await fetch("https://alcoban-vbk7q.ondigitalocean.app/Orders/OrderData/anaylsis/");
  const mainOrderData = await res2.json();

  return {
    props: {
      order_detail: data,
      OrderData: mainOrderData,
    },
  };
};

export default function AdminPanal({ order_detail, OrderData }) {
  const router = useRouter();

  

  useEffect(() => {
    let userValues = localStorage.getItem("mainUserValue");
    userValues = JSON.parse(userValues);
    
    if (userValues === null) {
      router.push("/Login");
    } else if (Object.keys(userValues).length === 0) {
      router.push("/Login");
    }
    
  }, [router]);

  return (
    <div>
      <Dashboard orderData={OrderData} orderDetail={order_detail} />
    </div>
  );
}
