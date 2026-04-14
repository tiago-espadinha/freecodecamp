def hanoi_solver(n):
    rods = [list(range(n, 0, -1)), [], []]
    moves = []

    def snapshot():
        moves.append(" ".join(str(rod) for rod in rods))

    def move(num_disks, source, target, auxiliary):
        if num_disks == 0:
            return
        move(num_disks - 1, source, auxiliary, target)
        target.append(source.pop())
        snapshot()
        move(num_disks - 1, auxiliary, target, source)

    snapshot()  # Record the starting arrangement
    move(n, rods[0], rods[2], rods[1])

    return "\n".join(moves)


if __name__ == "__main__":
    print(hanoi_solver(3))