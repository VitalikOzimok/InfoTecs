import { useState, useEffect } from "react";
import styles from "./Table.module.css";
import { Headers } from "./Header";
import Card from "./Card";
import { Loader } from "../loader/Loader";
import { PaginationWrapper } from "../pagination/PaginationWrapper";
import { Modal } from "../modal/Modal";
import { Filters } from "../checkboxes/Filters";

const itemsPerPage = 10;

export function Table() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [key, setKey] = useState("");
  const [order, setOrder] = useState("");
  const [filters, setFilters] = useState({
    hasMiddleName: false,
    gender: "",
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        let url =
          "https://dummyjson.com/users?limit=0&select=firstName,lastName,maidenName,age,gender,phone,email,address";

        if (key && order) {
          url += `&sortBy=${key}&order=${order}`;
        }

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const result = await res.json();
        setData(result.users);
        setFilteredData(result.users);
      } catch (err) {
        if (err.message === "Failed to fetch") {
          setError("Ошибка сети. Проверьте подключение к интернету.");
        } else {
          setError(err.message || "Произошла ошибка при загрузке");
        }
        console.error("Ошибка:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [key, order]);

  useEffect(() => {
    let result = [...data];

    if (filters.hasMiddleName) {
      result = result.filter(
        (user) => user.maidenName && user.maidenName.trim() !== "",
      );
    }

    if (filters.gender) {
      result = result.filter((user) => user.gender === filters.gender);
    }

    setFilteredData(result);
    setCurrentPage(1);
  }, [filters, data]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const totalUsers = filteredData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCardClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSort = (sortKey, sortOrder) => {
    setKey(sortKey);
    setOrder(sortOrder);
    setCurrentPage(1);
  };
  if (error) {
    return <h3>⚠️ {error}</h3>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Filters onFilterChange={handleFilterChange} filters={filters} />
      <PaginationWrapper
        totalItems={totalUsers}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      >
        <div className={styles.table}>
          <Headers onSort={handleSort} />
          {currentData.length > 0 ? (
            currentData.map((item) => (
              <Card
                key={item.id}
                firstName={item.firstName}
                lastName={item.lastName}
                maidenName={item.maidenName}
                age={item.age}
                gender={item.gender}
                phone={item.phone}
                email={item.email}
                city={item.address?.city}
                country={item.address?.country}
                onClick={() => handleCardClick(item)}
              />
            ))
          ) : (
            <div>Ничего не найдено</div>
          )}
        </div>
      </PaginationWrapper>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
      />
    </>
  );
}
