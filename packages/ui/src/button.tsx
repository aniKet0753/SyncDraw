interface Butoonprops {
  label: string;
    onClick?: () => void;
    loading?: boolean; 
}

export function Butoom({ label , onClick, loading}: Butoonprops) {
  return (
    <button
    onClick={onClick}
      style={{
        fontFamily:"Roboto",
        height:"50px",
        width:"240px",
        backgroundColor: "#006aff",
        color: "#ffffff",
        border: "none",
        borderRadius: "6px",
        alignItems: "center",
        fontSize: "20px",
        fontWeight: 500,
        cursor: loading ? "not-allowed" : "pointer",
        marginTop:"30px",
        borderColor:"black",
      }}    
    >
 {loading ? "Signing in..." : label}
    </button>
  );
}
