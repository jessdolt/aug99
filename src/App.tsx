import { useEffect, useRef, useState } from "react"
import "./App.css"
import ListItems from "./components/list-items"
import axios from "axios"

const API_URL = "https://api.spacexdata.com/v4/launches"

const limit = 5

function App() {
  const [data, setData] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [offset, setOffset] = useState(0)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [noMoreData, setNoMoreData] = useState(false)
  const observerTarget = useRef(null)

  const fetchData = async () => {
    try {
      setLoading(true)

      const response = await axios.post(`${API_URL}/query`, {
        options: {
          offset,
          limit,
        },
      })

      if (response.data.docs.length === 0) {
        setNoMoreData(true)
        return
      }

      if (data.length === 0) setData(response.data.docs)
      else setData((prevData) => [...prevData, ...response.data.docs])

      setOffset(offset + limit)
    } catch (e) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!noMoreData) fetchData()
  }, [page, noMoreData])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((page) => page + 1)
        }
      },
      { threshold: 1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [observerTarget])

  const filteredData = data.filter(
    (x) =>
      x?.name.toLowerCase().includes(search.toLowerCase()) ||
      x?.flight_number.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="App">
      <div className="card">
        <div className="list-container">
          <input
            type="text"
            className="search"
            placeholder="Enter keywords"
            onChange={(e) => setSearch(e.target.value)}
          />

          <ListItems data={filteredData} ref={observerTarget} />

          <div style={{ minHeight: 50 }}>
            {loading && <div className="loader" />}
            {error && <p className="error-message">{error}</p>}
            {noMoreData && <p className="">No more data to fetch.</p>}
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
