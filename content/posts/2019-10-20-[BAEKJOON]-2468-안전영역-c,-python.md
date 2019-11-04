---
title: "[BAEKJOON] 2468 안전영역 c, python"
date: "2019-10-20T14:48:59.169Z"
template: "post"
draft: false
slug: "/problem/baekjoon_2468/"
category: "problem"
tags:
  - "알고리즘문제풀이"
  - "알고리즘"
  - "BAEKJOON"
description: "[BAEKJOON] 2468 안전영역 c, python"




---



## [BAEKJOON] 2468 안전영역 - c, python

[문제](<https://www.acmicpc.net/problem/2468>)



그래프의 크기n과 그래프를 입력받는다.

비가 내릴때 안전한 영역의 개수를 구하는 것이기 때문에 비가 내리는 모든 상황을 가정해봐야한다.

> + 비가 내리는 최대 양을 고려해야하며, 그 이상으로 반복하지 않도록 주의한다.
> + **visited 그래프**를 따로 주어 체크를 해야 시간초과가 나지 않는다.
> + **비가 내리지 않는 경우**를 고려해야한다. == 최소 안전영역의 개수는 1이다.



+ C

  현재 들어온 정보를 Map으로, 방문 여부를 visited로 체크한다.

  ```c
  #include <stdio.h>
  
  int n;
  int Map[110][110];
  int visited[110][110];
  int max_h;
  int max;
  int dr[4] = { -1, 1, 0, 0 };
  int dc[4] = { 0, 0, -1, 1 };
  int wp, rp;
  int tr, tc;
  int nr, nc;
  
  struct Queue {
  	int r;
  	int c;
  };
  struct Queue Q[100 * 100];
  struct Queue tmp;
  void inque(int r, int c) {
  	Q[wp].r = r;
  	Q[wp].c = c;
  	wp++;
  }
  
  int is_wall(int r, int c) {
  	if (r < 0 || r >= n || c < 0 || c >= n) return 1;
  	return 0;
  }
  
  int BFS(int k) {
  	int cnt;
  	cnt = 0;
  	rp = wp = 0;
  	for (int r = 0; r < n; r++) {
  		for (int c = 0; c < n; c++) {
  			if (Map[r][c] > k && visited[r][c] == 0) {
  				inque(r, c);
  				visited[r][c] = 1;
  				cnt++;
  				while (rp < wp) {
  					tmp = Q[rp++];
  					tr = tmp.r;
  					tc = tmp.c;
  					
  					for (int i = 0; i < 4; i++) {
  						nr = dr[i] + tr;
  						nc = dc[i] + tc;
  						if (is_wall(nr, nc) == 0 && Map[nr][nc] > k && visited[nr][nc] == 0) {
  							inque(nr, nc);
  							visited[nr][nc] = 1;
  						}
  					}
  				}
  				
  			}
  		}
  	}
  	return cnt;
  }
  
  int main(void) {
  	scanf("%d", &n);
  	max = 1;
  	max_h = 0;
  	for (int r = 0; r < n; r++) {
  		for (int c = 0; c < n; c++) {
  			scanf("%d ", &Map[r][c]);
  			if (max_h < Map[r][c]) max_h = Map[r][c];
  		}
  	}
  	int cnt;
  	for (int k = 1; k <= max_h; k++) {
  		for (int r = 0; r < n; r++) {
  			for (int c = 0; c < n; c++) {
  				visited[r][c] = 0;
  			}
  		}
  		cnt = BFS(k);
  		if (max < cnt) max = cnt;
  	}
  	printf("%d", max);
  
  	return 0;
  }
  ```

  <br>

  <br>

  <br>

  <br>

+ python

  ```python
  deg = [(-1, 0), (1, 0), (0, -1), (0, 1)]
  Q = []
  def is_wall(r, c):
      if r < 0 or r >= n or c < 0 or c >= n:
          return True
      return False
  
  def bfs(rain):
      visited = [[0 for _ in range(n)] for _ in range(n)]
      cnt = 0
      for r in range(n):
          for c in range(n):
              if Map[r][c] > rain and not visited[r][c]:
                  cnt += 1
                  Q.append([r, c])
                  visited[r][c] = 1
                  while Q:
                      tr, tc = Q.pop(0)
                      for dr, dc in deg:
                          nr = tr + dr
                          nc = tc + dc
                          if not is_wall(nr, nc) and not visited[nr][nc] and Map[nr][nc] > rain:
                              Q.append([nr, nc])
                              visited[nr][nc] = 1
  
      return cnt
  
  
  
  n = int(input())
  Map = [list(map(int, input().split())) for _ in range(n)]
  final = 1
  for line in Map:
      final = max(final, max(line))
  safe = 1
  
  for rain in range(1, final+1):
      safe = max(safe, bfs(rain))
  
  print(safe)
  ```

  

