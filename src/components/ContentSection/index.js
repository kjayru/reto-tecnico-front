import React, { useState, useEffect } from 'react';
import { Layout, Tabs, Button, Table, Checkbox, Input, Select, Space, Modal } from 'antd';
import { PlusOutlined, ArrowUpOutlined, ArrowDownOutlined, FilterOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;

const ContentSection = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterColumn, setFilterColumn] = useState('');
  const [filterValues, setFilterValues] = useState([]);
  const [selectedFilterValues, setSelectedFilterValues] = useState({});
  const [searchFilter, setSearchFilter] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');

  useEffect(() => {
    fetch('https://backend-sistema-gestion.test/api/getdata-all')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map((item, index) => ({
          key: index,
          ...item,
        }));
        setData(formattedData);
        setFilteredData(formattedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const showFilterModal = (column) => {
    setFilterColumn(column);
    const uniqueValues = [...new Set(data.map(item => item[column]))];
    setFilterValues(uniqueValues);
    setSelectedFilterValues(prev => ({ ...prev, [column]: prev[column] || [] }));
    setSearchFilter('');
    setFilterModalVisible(true);
  };

  const handleFilter = () => {
    const newFilteredData = data.filter(item => {
      return Object.keys(selectedFilterValues).every(column => {
        if (selectedFilterValues[column].length === 0) {
          return true;
        }
        return selectedFilterValues[column].includes(item[column]);
      });
    });
    setFilteredData(newFilteredData);
    setFilterModalVisible(false);
  };

  const handleResetFilters = () => {
    setSelectedFilterValues({});
    setFilteredData(data);
  };

  const handleGlobalSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setGlobalSearch(value);
    const newFilteredData = data.filter(item => 
      Object.keys(item).some(key => 
        item[key].toString().toLowerCase().includes(value)
      )
    );
    setFilteredData(newFilteredData);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
  };

  const columns = [
    {
      title: 'División',
      dataIndex: 'division',
      key: 'division',
      sorter: (a, b) => a.division.localeCompare(b.division),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 0 }}> </div>
      ),
      filterIcon: filtered => <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} onClick={() => showFilterModal('division')} />,
    },
    {
      title: 'División Superior',
      dataIndex: 'division_superior',
      key: 'division_superior',
      sorter: (a, b) => a.division_superior.localeCompare(b.division_superior),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 0 }}> </div>
      ),
      filterIcon: filtered => <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} onClick={() => showFilterModal('division_superior')} />,
    },
    {
      title: 'Colaboradores',
      dataIndex: 'colaboradores',
      key: 'colaboradores',
    },
    {
      title: 'Nivel',
      dataIndex: 'niveles',
      key: 'niveles',
      sorter: (a, b) => a.niveles - b.niveles,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 0 }}> </div>
      ),
      filterIcon: filtered => <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} onClick={() => showFilterModal('niveles')} />,
    },
    {
      title: 'Subdivisiones',
      dataIndex: 'subdivisiones',
      key: 'subdivisiones',
      sorter: (a, b) => a.subdivisiones - b.subdivisiones,
    },
    {
      title: 'Embajadores',
      dataIndex: 'embajadores',
      key: 'embajadores',
      sorter: (a, b) => a.embajadores.length - b.embajadores.length,
    },
  ];

  return (
    <Content style={{ padding: '24px 50px', background: '#ffffff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div><h3>Organización</h3></div>
            <div>
                <Button icon={<PlusOutlined />} />
                <Button icon={<ArrowUpOutlined />} style={{ marginLeft: '8px' }} />
                <Button icon={<ArrowDownOutlined />} style={{ marginLeft: '8px' }} />
              </div>
            </div>
      <Tabs defaultActiveKey="1" >
        <TabPane tab="Divisiones" key="1">
          <div >
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>

              <div>
              <Button>Listado</Button>
              <Button style={{ marginLeft: '0' }}>Árbol</Button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <Select defaultValue="columnas" style={{ width: 120, marginLeft: '8px' }}>
                <Option value="columnas">Columnas</Option>
                {/* Agrega más opciones según sea necesario */}
              </Select>
              <Input.Search 
                placeholder="Buscar" 
                style={{ width: 200, marginLeft: '8px' }} 
                onChange={handleGlobalSearch}
              />
              </div>
            </div>
          </div>
          <Table
            rowSelection={rowSelection}
            columns={[
              ...columns,
            ]}
            dataSource={filteredData}
            pagination={{ position: ['bottomRight'] }}
          />
        </TabPane>
        <TabPane tab="Colaboradores" key="2">
          {/* Contenido para la pestaña de Colaboradores */}
        </TabPane>
      </Tabs>

      <Modal
        title={`Filtrar ${filterColumn}`}
        visible={filterModalVisible}
        onOk={handleFilter}
        onCancel={() => setFilterModalVisible(false)}
      >
        <Input.Search
          placeholder={`Buscar ${filterColumn}`}
          value={searchFilter}
          onChange={e => setSearchFilter(e.target.value)}
          style={{ marginBottom: 8 }}
        />
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {filterValues
            .filter(value => value.toString().toLowerCase().includes(searchFilter.toLowerCase()))
            .map(value => (
              <Checkbox
                key={value}
                value={value}
                checked={selectedFilterValues[filterColumn]?.includes(value)}
                onChange={e => {
                  const newSelectedFilterValues = { ...selectedFilterValues };
                  if (e.target.checked) {
                    newSelectedFilterValues[filterColumn] = [...(newSelectedFilterValues[filterColumn] || []), value];
                  } else {
                    newSelectedFilterValues[filterColumn] = newSelectedFilterValues[filterColumn].filter(v => v !== value);
                  }
                  setSelectedFilterValues(newSelectedFilterValues);
                }}
              >
                {value}
              </Checkbox>
            ))}
        </div>
      </Modal>
    </Content>
  );
};

export default ContentSection;