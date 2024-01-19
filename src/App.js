// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import Plot from 'react-plotly.js';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [barData, setBarData] = useState({ x: [], y: [] });

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100').then((res) => {
      return res.json();
    }).then((resData) => {
      setProducts(resData.products);
      setSelectedRows([0, 1, 2, 3, 4]);
    }).catch((err) => {
      console.log('err', err);
    });
  }, []);

  useEffect(() => {
    setBarChartData();
  }, [selectedRows]);

  const columns = [
    {
      name: "title",
      label: "Product Name",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "brand",
      label: "Brand",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "category",
      label: "Category",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "price",
      label: "Price",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "discountPercentage",
      label: "Discount %",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "rating",
      label: "Rating",
      options: {
        filter: false,
        sort: false,
      }
    },
  ];

  function setBarChartData() {
    const x = [];
    const y = [];

    if (products.length)
      selectedRows.forEach(i => {
        x.push(products[i].title);
        y.push(products[i].rating);
      });

    setBarData({ x, y });

  }

  const options = {
    filterType: 'multiselect',
    tableBodyHeight: '500px',
    rowsSelected: selectedRows,
    onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => {
      setSelectedRows(rowsSelected);
      // setBarChartData(rowsSelected);
    },
    selectToolbarPlacement: 'none',
    viewColumns: false
  };

  return (
    <div className="App">
      <div>
        <Plot
          data={[
            { type: 'bar', x: barData.x, y: barData.y },
          ]}
          layout={{
            width: 800, height: 600, title: 'Product wise rating chart',
            xaxis: {
              title: 'Product Name'
            },
            yaxis: {
              title: 'Rating'
            },
          }}
          config={{ displayModeBar: false }}
        />
      </div>

      <div>
        <MUIDataTable
          title={"Product List"}
          data={products}
          columns={columns}
          options={options}
        />
      </div>

    </div>
  );
}

export default App;
