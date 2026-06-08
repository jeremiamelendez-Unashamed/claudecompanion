export default function TeamTable({ members }) {
  return (
    <section className="panel team-panel">
      <div className="panel-header">
        <h2>Team Performance</h2>
        <p>Q2 leaderboard</p>
      </div>
      <table className="team-table">
        <thead>
          <tr>
            <th>Rep</th>
            <th>Active Deals</th>
            <th>Won</th>
            <th>Win Rate</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.name}>
              <td>{member.name}</td>
              <td>{member.deals}</td>
              <td>{member.won}</td>
              <td>{member.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
