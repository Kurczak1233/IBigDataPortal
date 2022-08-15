import { getAllPortalUsers } from "api/UsersClient";
import { ApplicationUser } from "interfaces/Models/Users/IApplicationUser";
import { useEffect, useRef, useState } from "react";

const UsersPageMainLogic = () => {
  const [allPortalUsers, setAllPortalUsers] = useState<ApplicationUser[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [currentItems, setCurrentItems] = useState<ApplicationUser[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const refContainer = useRef<HTMLDivElement>(null);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % allPortalUsers.length;
    setItemOffset(newOffset);
  };

  const calculateContainerHeight = (item: HTMLDivElement) => {
    if (Math.floor(item.offsetHeight / 68)) {
      setItemsPerPage(Math.floor(item.offsetHeight / 68));
    }
  };

  const handleGetAllPortalUsers = async () => {
    setAllPortalUsers(await getAllPortalUsers());
  };

  useEffect(() => {
    handleGetAllPortalUsers();
  }, []);

  useEffect(() => {
    if (refContainer.current !== null) {
      calculateContainerHeight(refContainer.current);
    }
  }, [refContainer]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(allPortalUsers.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(allPortalUsers.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, allPortalUsers]);

  return {
    allPortalUsers,
    setAllPortalUsers,
    handlePageClick,
    pageCount,
    currentItems,
    refContainer,
  };
};

export default UsersPageMainLogic;
