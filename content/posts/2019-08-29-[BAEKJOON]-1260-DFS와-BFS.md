---
title: "[BAEKJOON] 1260 DFS와 BFS"
date: "2019-08-29T16:19:15.169Z"
template: "post"
draft: false
slug: "/problem/baekjoon_1260/"
category: "problem"
tags:
  - "알고리즘문제풀이"
  - "알고리즘"
  - "swea"
description: "[BAEKJOON] 1260 DFS와 BFS"



---





## [BAEKJOON] 1260 DFS와 BFS - python, c

[문제](<https://www.acmicpc.net/problem/1260>)<br><br>

그래프의 정점, 간선 수와 방문 시작점을 입력받는다. 

간선 수의 개수만큼 연결된 두 정점을 입력받는다. 이후 시작점부터 그래프를 순회하는데 dfs와 bfs의 방법으로 순회를 하면 된다.

<del>DFS와 BSF에 관련한 포스트는 조만간 올릴 수 있도록 하겠다.</del>

**dfs와 bfs의 핵심은 visit 체크를 해 주는 것**이다. 내가 다음에 가려는 위치가 맞는지 파악하고, 이 위치에 지난번에 간 적 없으면 현재 위치를 다음번의 위치로 이동시킨다.

이 문제에서는 정점의 번호를 1번부터 n번까지 받게 된다. 이 경우 리스트에 접근할 때 [n-1]과 같은 방식으로 할 수 있는데, 이렇게 되면 한번씩 실수할 수 있는 가능성이 올라간다. 이것을 최소화 하기 위해 **배열의 사이즈를 n+1만큼 잡아 Map[n]에 접근할 수 있도록 한다.**

python에서는 리스트의 크기를 자유롭게 지정할 수 있기 때문에 크기에 대해 생각할 필요가 없지만, 

c에서는 배열의 크기를 먼저 지정해주어야 한다. 이 경우, 아주 큰 배열에 맞추게 되면 작은 배열을 생성해야 할 때 큰 메모리 손실이 일어나게 되며, 이를 막기 위해 동적할당으로 배열을 준다.<br>

- python

  ```python
  def DFS(v):
      for i in range(1, n+1):
          # 방문한 적이 없고, 연결된 간선이 있는 정점이면
          if not visited_dfs[i] and Map[v][i]:
              # 방문처리를 한다.
              visited_dfs[i] = 1
              result_dfs.append(i)
              # 이 정점을 중심으로 연결된 다른 정점을 찾으러 재귀.
              DFS(i)
  
  def BFS(v):
      result = []
      # BFS에서는 방문해야 할 리스트를 Q에 넣고, 동시에 방문처리를 한다.
      Q = [v]
      visited_bfs[v] = 1
      # 방문해야 할 리스트가 사라질 때 까지 반복
      while Q:
          # 현재 방문한 정점을 now로 받고, 결과 리스트에 append한다.
          now = Q.pop(0)
          result.append(now)
          for i in range(1, n+1):
              # 방문한 적이 없고, 연결된 간선이 있는 정점이면
              if not visited_bfs[i] and Map[now][i]:
                  # 방문해야 할 리스트(Q)에 넣고 방문처리한다.
                  Q.append(i)
                  visited_bfs[i] = 1
      return result
  
  
  n, m, v = list(map(int, input().split()))
  Map = [[0 for i in range(n+1)] for j in range(n+1)]
  visited_dfs = [0 for i in range(n+1)]
  result_dfs = []
  visited_bfs = [0 for i in range(n+1)]
  for i in range(m):
      x, y = list(map(int, input().split()))
      Map[x][y] = 1
      Map[y][x] = 1
  
  visited_dfs[v] = 1
  result_dfs.append(v)
  DFS(v)
  print(' '.join(map(str, result_dfs)))
  print(' '.join(map(str, BFS(v))))
  ```

  <br><br><br>

- c

  ```c
  #include <stdio.h>
  #include <malloc.h>
  
  int n, m, v;
  int **Map;
  int x, y;
  int *dfs_visit;
  int *bfs_visit;
  int *Q;
  int rp, wp;
  
  void DFS(int v) {
  	for (int i = 1; i <= n; i++) {
          // 방문한 적이 없고, 연결된 간선이 있는 정점이면
  		if (Map[v][i] == 1 && dfs_visit[i] != 1) {
              // 방문처리를 하고 정점을 출력. 
  			dfs_visit[i] = 1;
  			printf("%d ", i);
              // 그 정점으로 연결된 다른 정점들을 찾기위해 재귀
  			DFS(i);
  		}
  		
  	}
  }
  
  void BFS(int v) {
  	int now;
  	Q[wp++] = v;
  	bfs_visit[v] = 1;
  	while (rp < wp) {
  		now = Q[rp++];
  		printf("%d ", now);
  		for (int i = 1; i <= n; i++) {
              // 방문한 적이 없고, 연결된 간선이 있는 정점이면
  			if (Map[now][i] == 1 && bfs_visit[i] != 1) {
  				// 방문해야 할 리스트에 넣고, 방문처리.
                  Q[wp++] = i;
  				bfs_visit[i] = 1;
  			}
  		}
  	}
  }
  
  int main(void) {
  	freopen("1260_input.txt", "r", stdin);
  	scanf("%d %d %d", &n, &m, &v);
      // Map은 2차원 배열을 동적할당 하기 위해 n + 1개의 1차원 배열을 n + 1 사이즈의 배열에 각각 연결한다.
  	Map = (int**)malloc(sizeof(int*) * (n + 1));
  	dfs_visit = (int*)malloc(sizeof(int) * (n + 1));
  	bfs_visit = (int*)malloc(sizeof(int) * (n + 1));
      // Q는 방문해야 하는 정점 리스트이기 때문에 문제에 따라 좀 더 여유있게 잡아주는 것이 좋다.
  	Q = (int*)malloc(sizeof(int)*(2 * n));
  	for (int i = 1; i <= n; i++) {
  		Map[i] = (int*)malloc(sizeof(int) * (n + 1));
  	}
  	for (int cnt = 0; cnt < m; cnt++) {
  		scanf("%d %d", &x, &y);
  		Map[x][y] = 1;
  		Map[y][x] = 1;
  	}
  
  	dfs_visit[v] = 1;
  	printf("%d ", v);
  	DFS(v);
      // BFS에서는 append와 pop이 자유롭지 않기 때문에 read point와 write point 각각을 rp, wp로 두어 사용한다.
  	rp = wp = 0;
  	printf("\n");
  	BFS(v);
  
  
  	// 동적할당으로 사용한 배열들의 메모리를 해제해준다.
  	for (int i = 0; i < n + 1; i++) {
  		free(Map[i]);
  	}
  	free(Map);
  	free(dfs_visit);
  	free(bfs_visit);
  	free(Q);
  	return 0;
  }
  ```

  

